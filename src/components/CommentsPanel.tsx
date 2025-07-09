'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { useCanvas } from '@/context/DiagramContext'

interface Comment {
  id: string
  elementId: string
  author: string
  content: string
  type: 'request' | 'suggestion' | 'info'
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
  replies?: Comment[]
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: '1',
    elementId: 'element1',
    author: 'John Doe',
    content: 'This entity should include a timestamp field for audit purposes.',
    type: 'suggestion',
    status: 'pending',
    createdAt: new Date('2024-01-15T10:30:00'),
    updatedAt: new Date('2024-01-15T10:30:00'),
    replies: [
      {
        id: '1-1',
        elementId: 'element1',
        author: 'Jane Smith',
        content: 'Good point! I\'ll add created_at and updated_at fields.',
        type: 'info',
        status: 'accepted',
        createdAt: new Date('2024-01-15T11:00:00'),
        updatedAt: new Date('2024-01-15T11:00:00')
      }
    ]
  },
  {
    id: '2',
    elementId: 'element2',
    author: 'Alice Johnson',
    content: 'The relationship cardinality seems incorrect. Should be one-to-many.',
    type: 'request',
    status: 'pending',
    createdAt: new Date('2024-01-16T09:15:00'),
    updatedAt: new Date('2024-01-16T09:15:00')
  }
]

export function CommentsPanel() {
  const { canvasState } = useCanvas()
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState('')
  const [commentType, setCommentType] = useState<'request' | 'suggestion' | 'info'>('suggestion')
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all')

  const selectedElementId = canvasState.selection[0]
  
  const filteredComments = comments.filter(comment => {
    const matchesElement = !selectedElementId || comment.elementId === selectedElementId
    const matchesFilter = filter === 'all' || comment.status === filter
    return matchesElement && matchesFilter
  })

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedElementId) return

    const comment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      elementId: selectedElementId,
      author: 'Current User',
      content: newComment.trim(),
      type: commentType,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setComments([...comments, comment])
    setNewComment('')
  }

  const handleStatusChange = (commentId: string, newStatus: Comment['status']) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, status: newStatus, updatedAt: new Date() }
        : comment
    ))
  }

  const handleReply = (parentId: string, replyContent: string) => {
    const reply: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      elementId: selectedElementId || '',
      author: 'Current User',
      content: replyContent,
      type: 'info',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setComments(comments.map(comment =>
      comment.id === parentId
        ? { ...comment, replies: [...(comment.replies || []), reply] }
        : comment
    ))
  }

  const getStatusIcon = (status: Comment['status']) => {
    switch (status) {
      case 'pending': return <Icons.clock className="h-3 w-3 text-yellow-500" />
      case 'accepted': return <Icons.check className="h-3 w-3 text-green-500" />
      case 'rejected': return <Icons.x className="h-3 w-3 text-red-500" />
      case 'completed': return <Icons.checkCircle className="h-3 w-3 text-blue-500" />
      case 'cancelled': return <Icons.xCircle className="h-3 w-3 text-gray-500" />
    }
  }

  const getTypeColor = (type: Comment['type']) => {
    switch (type) {
      case 'request': return 'bg-red-100 text-red-800'
      case 'suggestion': return 'bg-blue-100 text-blue-800'
      case 'info': return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header with filters */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Comments</span>
          <span className="text-xs text-muted-foreground">
            {filteredComments.length} comment{filteredComments.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="flex space-x-1">
          {(['all', 'pending', 'accepted', 'rejected'] as const).map(filterType => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter(filterType)}
              className="text-xs h-6 px-2"
            >
              {filterType}
            </Button>
          ))}
        </div>
      </div>

      {/* Comments list */}
      <div className="flex-1 overflow-auto p-3 space-y-3">
        {filteredComments.length === 0 ? (
          <div className="text-center text-muted-foreground text-sm py-8">
            <Icons.messageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
            {selectedElementId ? 'No comments for this element' : 'Select an element to view comments'}
          </div>
        ) : (
          filteredComments.map(comment => (
            <div key={comment.id} className="border border-border rounded p-3">
              {/* Comment header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{comment.author}</span>
                  <span className={`text-xs px-2 py-1 rounded ${getTypeColor(comment.type)}`}>
                    {comment.type}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(comment.status)}
                  <span className="text-xs text-muted-foreground">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
              </div>

              {/* Comment content */}
              <p className="text-sm mb-2">{comment.content}</p>

              {/* Comment actions */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {comment.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleStatusChange(comment.id, 'accepted')}
                        className="h-6 px-2 text-xs"
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleStatusChange(comment.id, 'rejected')}
                        className="h-6 px-2 text-xs"
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const replyContent = prompt('Enter your reply:')
                    if (replyContent) {
                      handleReply(comment.id, replyContent)
                    }
                  }}
                  className="h-6 px-2 text-xs"
                >
                  Reply
                </Button>
              </div>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-3 pl-4 border-l-2 border-border space-y-2">
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="text-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{reply.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(reply.createdAt)}
                        </span>
                      </div>
                      <p>{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add comment form */}
      {selectedElementId && (
        <div className="p-3 border-t border-border">
          <div className="space-y-2">
            <div className="flex space-x-2">
              <select
                value={commentType}
                onChange={(e) => setCommentType(e.target.value as any)}
                className="px-2 py-1 text-xs border border-border rounded"
              >
                <option value="suggestion">Suggestion</option>
                <option value="request">Request</option>
                <option value="info">Info</option>
              </select>
            </div>
            
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              rows={2}
              className="w-full px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            />
            
            <div className="flex justify-end">
              <Button
                size="sm"
                onClick={handleAddComment}
                disabled={!newComment.trim()}
              >
                Add Comment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}